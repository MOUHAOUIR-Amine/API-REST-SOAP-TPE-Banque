package service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import metier.Client;
import metier.Commercant;
import metier.Compte;
@WebService(name="BanqueWS")
public class BanqueWebService {
	private static HashMap<Long, Commercant> ensemble_commercants = new 
			HashMap<Long, Commercant>();
	private static HashMap<Long, Client> ensemble_client = new 
			HashMap<Long, Client>();
	private static HashMap<Long, Compte> compte_commercants = new 
			HashMap<Long, Compte>();
	private static HashMap<Long, Compte> compte_client = new 
			HashMap<Long, Compte>();
	private static ArrayList<String> transactions = new 
			ArrayList<String>();
	
	
	@WebMethod(operationName="enregistrement")
	public Commercant registerCommercant(@WebParam(name="register") Commercant c){
		ensemble_commercants.put(c.getId(), c);
		Compte cmt = new Compte(c.getId(), new Date(), Math.random()*1000000);
		compte_commercants.put(cmt.getId(), cmt);
		return c;
	}
	@WebMethod(operationName="authentification")
	public String authentifier(@WebParam(name="login") String login,@WebParam(name="password") String password){
		String test="Votre login ou mot de passe est incorrect!!!";
		for(Long e: ensemble_commercants.keySet()){
			if(ensemble_commercants.get(e).getLogin().equals(login) && ensemble_commercants.get(e).getPassword().equals(password))
				test="Vous avez été authentifié avec succès!!!";
		}
		return test;
	}
	@WebMethod(operationName="creationClients")
	public boolean createClient(){
		for(int i=1;i<100;i++){
			Client cl = new Client(i, "Nom "+i, "Prénom "+i);
			Compte c = new Compte( i, new Date(), Math.random()*1000000);
			ensemble_client.put(cl.getId(), cl);
			compte_client.put(c.getId(), c);
		}
		return true;
	}
	@WebMethod(operationName="paiementClients")
	public String payement_Client(@WebParam(name="idClient") long idClient,@WebParam(name="montant") double montant,@WebParam(name="idCommercant") long idCommercant){
		compte_client.get(idClient).setSolde(compte_client.get(idClient).getSolde()-montant);
		compte_commercants.get(idCommercant).setSolde(compte_commercants.get(idCommercant).getSolde()+montant);
		transactions.add("Le client de l'id = "+idClient+" à payer "+montant+" dh au commercant de l' id "+idCommercant+" le "+new Date());
		return "Votre paiement à été éfféctué avec succé";
	}
	@WebMethod
	public Commercant getCommercant(@WebParam(name="id") long id){
		return ensemble_commercants.get(id);
	}
	@WebMethod
	public List<Commercant> getListCommercants(){
		List<Commercant> a = new ArrayList<Commercant>(ensemble_commercants.values());
		return a;
	}
	@WebMethod
	public Compte getCompteClient(@WebParam(name="code") Long id){
		return compte_client.get(id);
	}
	@WebMethod
	public Compte getCompteCommercant(@WebParam(name="code") Long id){
		return compte_commercants.get(id);
	}
	@WebMethod
	public ArrayList<String> getListTransactions(){
		return transactions;
	}
}
