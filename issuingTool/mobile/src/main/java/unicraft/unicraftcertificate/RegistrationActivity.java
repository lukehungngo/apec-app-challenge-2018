package unicraft.unicraftcertificate;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.os.AsyncTask;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.ExecutionException;

/**
 * Created by UnciCraft on 23/05/2018.
 */

public class RegistrationActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);
        getSupportActionBar().setTitle("Artisan's information");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        this.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);

//        RelativeLayout btnTakePhoto = (RelativeLayout) findViewById(R.id.btnTakePhoto);
//        RelativeLayout btnRegister = (RelativeLayout) findViewById(R.id.btnRegister);


    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
            return true;
        }
        return false;
    }

    static final int REQUEST_IMAGE_CAPTURE = 1;

    public void takePhoto(View v) {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");
            ((ImageView) findViewById(R.id.zoomImage)).setImageBitmap(imageBitmap);
        }
    }

    public void registerArtisan(View v) throws ExecutionException, InterruptedException, NoSuchAlgorithmException, JSONException {
        EditText nameInput = (EditText) findViewById(R.id.nameText);
        EditText nidInput = (EditText) findViewById(R.id.nidText);
        ImageView avatar = (ImageView) findViewById(R.id.zoomImage);

        String name = nameInput.getText().toString();
        String nid =  nidInput.getText().toString();
        String image = Global.base64Encode(((BitmapDrawable)avatar.getDrawable()).getBitmap());

        MessageDigest md = MessageDigest.getInstance("SHA-512");
        byte[] digest = md.digest(image.getBytes());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < digest.length; i++) {
            sb.append(Integer.toString((digest[i] & 0xff) + 0x100, 16).substring(1));
        }


//            String imageString = ;
//            Log.v("image string",imageString);
        String context = (new RegisterCertificate()).execute("https://boiling-plains-88265.herokuapp.com/issueCertificate",
                name,
                nid,
                sb.toString()//Hash of picture
        ).get();

        Intent myIntent = new Intent(RegistrationActivity.this, PendingTxActivity.class);
        myIntent.putExtra("BlocckhainData", context);
        myIntent.putExtra("Name", name);
        myIntent.putExtra("NID", nid);
        myIntent.putExtra("Picture", image);

        RegistrationActivity.this.startActivity(myIntent);

//        Log.v("Hiep",context);
    }

    private class RegisterCertificate extends AsyncTask<String, Integer, String> {
        protected String doInBackground(String... urls) {
            String content = "";
            try {
                URL url = new URL(urls[0]);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();

                conn.setRequestMethod("POST");
                conn.setDoOutput(true);
                conn.setRequestProperty("Content-Type", "application/json");

                JSONObject params = new JSONObject();

                params.accumulate("name", urls[1]);
                params.accumulate("ssn", urls[2]);
                params.accumulate("picture",urls[3]);

                OutputStreamWriter out = new OutputStreamWriter(conn.getOutputStream());

                out.write(params.toString());
                out.flush();
                out.close();

                int res = conn.getResponseCode();

                InputStream is = conn.getInputStream();
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                String line = null;
                StringBuffer response = new StringBuffer();

                while((line = br.readLine() ) != null) {
                    response.append(line);
                }
                br.close();

                JSONObject resObject = new JSONObject(response.toString());

                content = resObject.toString();

                conn.disconnect();
            } catch (Exception e) {
                e.printStackTrace();
            }
            return content;
        }
    }
}
