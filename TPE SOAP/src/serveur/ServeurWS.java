package serveur;

import javax.xml.ws.Endpoint;

import service.BanqueWebService;

public class ServeurWS {

	public static void main(String[] args) {
		String url = "http://localhost:8090/";
		Endpoint.publish(url, new BanqueWebService());
		System.out.println(url);

	}

}
