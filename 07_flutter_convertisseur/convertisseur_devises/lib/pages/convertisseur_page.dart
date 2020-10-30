import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:convertisseur_devises/models/devises.dart';
import 'package:convertisseur_devises/styles.dart';
import 'package:convertisseur_devises/widgets/saisie_nombre.dart';
import 'package:convertisseur_devises/widgets/liste_devises.dart';

class ConvertisseurDevisePage extends StatefulWidget {
  ConvertisseurDevisePage();
  @override
  State<StatefulWidget> createState() {
    return _ConvertisseurDevisePage();
  }
}

class _ConvertisseurDevisePage extends State<ConvertisseurDevisePage> {
  // les différents "états" de la page
  double _valeur; // valeur saisie
  Devise _deviseInitial; // devise initiale sélectionnée
  Devise _deviseFinale; // devise finale sélectionnée
  double _resultat; // le résultat de la conversion
  // définition des valeurs initiales
  @override
  void initState() {
    super.initState();
    _valeur = 0;
    _resultat = 0;
    _deviseInitial = Devise.EURO;
    _deviseFinale = Devise.DOLLAR;
  }

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(
      children: [
        Spacer(),
        Text(
          'Valeur',
          style: AppStyle.labelStyle,
        ),
        Spacer(),
        SaisieNombre(onChangeValue: (saisie) {
          var valeurSaisie = double.parse(saisie);
          setState(() {
            _valeur = valeurSaisie;
          });
        }),
        Spacer(),
        Text(
          'De',
          style: AppStyle.labelStyle,
        ),
        Spacer(),
        ListeDevise(
            devise: _deviseInitial,
            onChangeValue: (newVal) => {
                  setState(() {
                    _deviseInitial = newVal;
                  })
                }),
        Spacer(),
        Text('Vers', style: AppStyle.labelStyle),
        Spacer(),
        ListeDevise(
            devise: _deviseFinale,
            onChangeValue: (newVal) => {
                  setState(() {
                    _deviseFinale = newVal;
                  })
                }),
        Spacer(
          flex: 2,
        ),
        ElevatedButton(
            onPressed: () => {
                  setState(() {
                    _resultat = _valeur *
                        _deviseFinale.getTaux /
                        _deviseInitial.getTaux;
                  })
                },
            child: Text('Convertir')),
        Spacer(
          flex: 2,
        ),
        Text(_resultat.toString(), style: AppStyle.labelStyle),
        Spacer(),
      ],
    ));
  }
}
