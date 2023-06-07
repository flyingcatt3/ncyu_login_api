import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
//https://skyao.github.io/2016/01/13/java-string-practice/
public class post{
    public static void main(String args[]){
        String s = "\\xe8\\x99\\x95\\xe7\\x90\\x86\\xe6\\xad\\xa4\\xe8\\xa6\\x81\\xe6\\xb1\\x82\\xe6\\x99\\x82\\xe7\\x99\\xbc\\xe7\\x94\\x9f\\xe9\\x8c\\xaf\\xe8\\xaa\\xa4\\xe3\\x80\\x82";
        String s1 = s.replace("\\x","%");
        String s2 = URLDecoder.decode(s1,StandardCharsets.UTF_8);
        System.out.println(s2);


    }
}