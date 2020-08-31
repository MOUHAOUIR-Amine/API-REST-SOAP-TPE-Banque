package metier;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="commercant")
public class Commercant implements Serializable{
	private long id;
	private String Nom;
	private String Prenom;
	private String login;
	private String password;
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNom() {
		return Nom;
	}
	public void setNom(String nom) {
		Nom = nom;
	}
	public String getPrenom() {
		return Prenom;
	}
	public void setPrenom(String prenom) {
		Prenom = prenom;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Commercant(long id, String nom, String prenom, String login, String password) {
		super();
		this.id = id;
		Nom = nom;
		Prenom = prenom;
		this.login = login;
		this.password = password;
	}
	public Commercant() {
		super();
	}

}
