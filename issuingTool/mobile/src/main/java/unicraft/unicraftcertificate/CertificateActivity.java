package unicraft.unicraftcertificate;

import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

public class CertificateActivity extends AppCompatActivity {
    JSONObject bcData;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_certificate);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        String blockchainData = (String) getIntent().getExtras().getString("BlockchainData");
        String name = (String) getIntent().getExtras().getString("Name");
        String nid = (String) getIntent().getExtras().getString("NID");
        String picture = (String) getIntent().getExtras().getString("Picture");
        ((ImageView) findViewById(R.id.zoomImage)).setImageBitmap(Global.base64Decode(picture));

        try {
            Log.v("Hiep",blockchainData);
            bcData = new JSONObject(blockchainData);
            ((TextView) findViewById(R.id.idText)).setText(bcData.getString("ArtisanId"));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        ((TextView) findViewById(R.id.nameText)).setText(name);
        ((TextView) findViewById(R.id.nidText)).setText(nid);

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
            return true;
        }
        return false;
    }

    public void verifyCertificate(View v) throws JSONException {
        startActivity(new Intent(Intent.ACTION_VIEW).setData(Uri.parse(bcData.getString("Link") + "#eventlog")));

    }
}
