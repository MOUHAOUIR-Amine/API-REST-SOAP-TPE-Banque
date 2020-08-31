package metier;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Compte {
	private Long id;
	private Date dateCreation;
	private double Solde;


	public Date getDateCreation() {
		return dateCreation;
	}
	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}
	public double getSolde() {
		return Solde;
	}
	public void setSolde(double solde) {
		Solde = solde;
	}
	public Compte() {
		super();
	}
	public Compte(long id, Date dateCreation, double solde) {
		super();
		this.id = id;
		this.dateCreation = dateCreation;
		Solde = solde;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
}
