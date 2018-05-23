package unicraft.unicraftcertificate;

import android.content.Intent;
import android.graphics.Color;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.view.WindowManager;
import android.widget.RelativeLayout;
import android.widget.TextView;

import pl.droidsonroids.gif.GifImageView;

public class PendingTxActivity extends AppCompatActivity {

    String blockchainData;
    String name;
    String nid;
    String picture;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pending_tx);
        getSupportActionBar().setTitle("Pending eCertificate");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        this.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);


        blockchainData = (String) getIntent().getExtras().getString("BlockchainData");
        name = (String) getIntent().getExtras().getString("Name");
        nid = (String) getIntent().getExtras().getString("NID");
        picture = (String) getIntent().getExtras().getString("Picture");

        final Handler handler = new Handler();
        Runnable runnable = new Runnable() {
            int i = 0;

            public void run() {
                ((GifImageView) findViewById(R.id.imgStatus)).setImageResource(R.drawable.ok);
                ((TextView) findViewById(R.id.statusText)).setTextColor(Color.parseColor("#6ac259"));
                ((TextView) findViewById(R.id.statusText)).setText("eCertificate " + "is confirmed!");
                ((RelativeLayout) findViewById(R.id.btnViewCert)).setVisibility(View.VISIBLE);

                handler.postDelayed(this, 15000);
            }
        };
        handler.postDelayed(runnable, 15000);

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
            return true;
        }
        return false;
    }
    public void viewCertificate(View v) {
        Intent myIntent = new Intent(PendingTxActivity.this, CertificateActivity.class);
        myIntent.putExtra("BlockchainData", blockchainData);
        myIntent.putExtra("Name", name);
        myIntent.putExtra("NID", nid);
        myIntent.putExtra("Picture", picture);

        PendingTxActivity.this.startActivity(myIntent);
    }
}
