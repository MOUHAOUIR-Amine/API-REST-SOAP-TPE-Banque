package metier;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Client {
	private long id;
	private String Nom;
	private String Prenom;
	
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
	
	public Client() {
		super();	
	}
	public Client(long id, String nom, String prenom) {
		super();
		this.id = id;
		Nom = nom;
		Prenom = prenom;
	}
	
	
	
}
