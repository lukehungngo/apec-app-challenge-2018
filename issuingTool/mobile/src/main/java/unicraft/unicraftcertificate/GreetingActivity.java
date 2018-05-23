package unicraft.unicraftcertificate;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.widget.RelativeLayout;

/**
 * Created by UnciCraft on 23/05/2018.
 */

public class GreetingActivity extends AppCompatActivity  implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_greeting);
        this.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);


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
