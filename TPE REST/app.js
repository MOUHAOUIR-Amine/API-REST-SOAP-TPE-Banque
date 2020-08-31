require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const encrypt = require('mongoose-encryption');


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/banqueDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const compteSchema = new mongoose.Schema({
    nom:String,
    prenom:String,
    datedecreation: Date,
    solde: Number
});

const clientSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  compte:compteSchema
});
const commercantSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  login: String,
  password: String,
  compte:compteSchema
});

const transactionSchema = new mongoose.Schema({
    idclient: String,
    idcommercant: String,
    montant:Number
});

// commercantSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"]});


const Compte = mongoose.model("Compte", compteSchema);
const Client = mongoose.model("Client", clientSchema);
const Commercant = mongoose.model("Commercant", commercantSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);



// "/clients" route

app.get("/clients",function(req, res) {
    Client.find(function(err, clients) {
      if (err) {
        console.log(err);
      } else {
        res.send(clients)
      }
    })
  });

// "/commercants" route
app.get("/commercants",function(req, res) {
    Commercant.find(function(err, commercants) {
      if (err) {
        console.log(err);
      } else {
        res.send(commercants)
      }
    })
  });

  // "/comptesClient" route
  app.get("/comptesClient",function(req, res) {
      Client.find(function(err, clients) {
        if (err) {
          console.log(err);
        } else {
            clients.forEach((client) => {
              res.send(client.compte)
            });


        }
      })
    });

  // "/comptesCommercant" route
  app.get("/comptesCommercant",function(req,res) {
      Commercant.find(function(err, commercants) {
        if (err) {
          console.log(err);
        } else {
            commercants.forEach((commercant) => {
              console.log(commercant.compte);
              res.send(commercant.compte)
            });
        }
      })
    });

//afficher tous les comptes(clients et commercants)
app.get("/comptes",function(req,res) {
  Compte.find(function(err,comptes) {
    if (err) {
      console.log(err);
    }else {
      res.send(comptes)
    }
  })
})


// post and delete clients et commercants
app.post("/client",function(req, res) {
    var day = new Date();
    var soldee=(Math.random())*10000;
    const client = new Client({
      nom: req.body.nom,
      prenom: req.body.prenom,
      compte:{
        datedecreation:day,
        solde:soldee
      }
    })
    client.save();
    const compte = new Compte({
        nom: req.body.nom,
        prenom: req.body.prenom,
        datedecreation:day,
        solde:soldee
    })
    compte.save();
    res.send("created");
  });

  app.post("/commercant",function(req, res) {
      var day = new Date();
      var soldee=(Math.random())*10000;
      const commercant = new Commercant({
        login:req.body.login,
        nom: req.body.nom,
        prenom: req.body.prenom,
        password:req.body.password,
        compte:{
          datedecreation:day,
          solde:soldee
        }
      })
      commercant.save();
      const compte = new Compte({
          nom: req.body.nom,
          prenom: req.body.prenom,
          datedecreation:day,
          solde:soldee
      })
      compte.save();
      res.send("commercant created");
    });


app.delete("/clients",function(req, res) {
    Client.deleteMany(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.send("deleted");
      }
    })
  })
;
app.delete("/commercants",function(req, res) {
    Commercant.deleteMany(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.send("deleted");
      }
    })
  })
;



// clientbyid :

app.get('/client/:id',function(req,res) {
    var param=req.params.id;
    Client.find({_id:param},function(err,client) {
      if (err) {
        res.send(err)
      }else {
        res.send(client)
      }
    })
  })

// CompteClientbyidclient :
app.get('/compteClient/:id',function(req,res) {
    var param=req.params.id;
    Client.find({_id:param},function(err,client) {
      if (err) {
        res.send(err)
      }else {
        res.send(client[0].compte)
      }
    })
  })


// commercantbyidcommercant
  app.get('/commercant/:id',function(req,res) {
      var param=req.params.id;
      Commercant.find({_id:param},function(err,commercant) {
        if (err) {
          res.send(err)
        }else {
          res.send(commercant)
        }
      })
    })

// compteCommercantbyid
app.get('/compteCommercant/:id',function(req,res) {
    var param=req.params.id;
    Commercant.find({_id:param},function(err,commercant) {
      if (err) {
        res.send(err)
      }else {
        res.send(commercant[0].compte)
      }
    })
  })

// compte by id du compte
app.get('/compte/:id',function(req,res) {
    var param=req.params.id;
    Compte.find({_id:param},function(err,compte) {
      if (err) {
        res.send(err)
      }else {
        res.send(compte)
      }
    })
  })

// update client et commercant by id

app.patch('/client/:id',function(req,res) {
    var id=req.params.id;
    Client.updateOne({_id:id},{$set :req.body},function(err) {
      if (err) {
        console.log(err);
      }else {
        res.send("updated")
      }
    });
  })
  app.patch('/commercant/:id',function(req,res) {
      var id=req.params.id;
      Commercant.updateOne({_id:id},{$set :req.body},function(err) {
        if (err) {
          console.log(err);
        }else {
          res.send("updated")
        }
      });
    })

// update compte

app.patch('/compte/:id',function(req,res) {
    var id=req.params.id;
    Compte.updateOne({_id:id},{$set :req.body},function(err) {
      if (err) {
        console.log(err);
      }else {
        res.send("updated")
      }
    });
  })



// delete client by id

app.delete('/client/:id',function(req,res) {
    var id=req.params.id;
    Client.deleteOne({_id:id},function(err) {
      if (err) {
        console.log(err);
      }else {
        res.send("deleted")
      }
    });
  })
;

// delete commercant by id

app.delete('/commercant/:id',function(req,res) {
    var id=req.params.id;
    Commercant.deleteOne({_id:id},function(err) {
      if (err) {
        console.log(err);
      }else {
        res.send("deleted")
      }
    });
  })
;



// authentification

app.post("/authentification",function(req,res) {
  var logininput=req.body.login;
  var passwordinput=req.body.password;
  Commercant.find({login:logininput},function(err,commercants) {
    if (err) {
      console.log(err);
    }else {
      if (commercants[0].password==passwordinput) {
        res.send("authentified")
      }else {
        res.send("erreur")
      }
    }
  })
})

// paiement

app.patch('/comptePaiement',function(req,res) {
    var idcl=req.body.idclient;
    var idcm=req.body.idcommercant;
    var montant=req.body.montant;
    var soldecl=0;
    Compte.find({_id:idcl},function(err,compteCl) {
      if (err) {
        console.log(err);
      }else {
        soldecl=compteCl[0].solde-montant;
        Compte.updateOne({_id:idcl},{$set :{solde:soldecl}},function(err) {
          if (err) {
            console.log(err);
          }else {
            res.write("compte client updated");
            res.send();
          }
        });
      }
    })
    var soldecm=0;
    Compte.find({_id:idcm},function(err,compteCm) {
      if (err) {
        console.log(err);
      }else {
        soldecm=Number(compteCm[0].solde) + Number(montant);
        console.log(soldecm);
        Compte.updateOne({_id:idcm},{$set :{solde:soldecm}},function(err) {
            console.log(soldecm);
        });
      }
    })
    const transaction=new Transaction({
      idclient: idcl,
      idcommercant: idcm,
      montant:montant
    })
    transaction.save();
  })

// afficher transactions
app.get('/transactions',function(req,res) {
  Transaction.find(function(err,transactions) {
    if (err) {
      console.log(err);
    }else {
      res.send(transactions)
    }
  })
})
app.get('/transaction/:idcm',function(req,res) {
  var idcommerc=req.params.idcm;
  Transaction.find({idcommercant:idcommerc},function(err,transactions) {
    if (err) {
      console.log(err);
    }else {
      res.send(transactions)
    }
  })
})






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
