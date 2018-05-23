package unicraft.unicraftcertificate;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.RelativeLayout;


public class GreetingActivity extends AppCompatActivity  implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_greeting);

        //View objects
        RelativeLayout buttonRegister = (RelativeLayout) findViewById(R.id.btnRegister);

        //attaching onclick listener
        buttonRegister.setOnClickListener(this);

        if (getIntent().getExtras() != null && getIntent().getExtras().getBoolean("EXIT", false)) {
            finish();
        }
    }

    @Override
    public void onBackPressed()
    {
        moveTaskToBack(true);
    }

    @Override
    public void onClick(View view) {
        //initiating the qr code scan
        Intent myIntent = new Intent(GreetingActivity.this, RegistrationActivity.class);
        GreetingActivity.this.startActivity(myIntent);
    }
}
