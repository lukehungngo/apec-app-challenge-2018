package unicraft.unicraftcertificate;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import java.io.ByteArrayOutputStream;

/**
 * Created by UnciCraft on 23/05/2018.
 */

public class Global {
    public static Bitmap base64Decode (String imageString) {
        imageString = imageString.substring(imageString.indexOf(",")+1);
        byte [] decodeString = Base64.decode(imageString,Base64.DEFAULT);
        return BitmapFactory.decodeByteArray(decodeString,0,decodeString.length);
    }
    public static String base64Encode (Bitmap img) {
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        img.compress(Bitmap.CompressFormat.PNG, 100, stream);
        byte[] bytesEncoded = Base64.encode(stream.toByteArray(),Base64.DEFAULT);
        String imageString = new String(bytesEncoded);
        return imageString;
    }
}
