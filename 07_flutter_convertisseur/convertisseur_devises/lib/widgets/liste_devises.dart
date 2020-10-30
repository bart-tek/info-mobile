import 'package:flutter/material.dart';
import 'package:convertisseur_devises/models/devises.dart';

class ListeDevise extends StatelessWidget {
  final Function onChangeValue;

  const ListeDevise(
      {Key key, @required Devise devise, @required this.onChangeValue})
      : _devise = devise,
        super(key: key);

  final Devise _devise;

  @override
  Widget build(BuildContext context) {
    return DropdownButton(
        value: _devise,
        isExpanded: true,
        onChanged: onChangeValue,
        items: [
          for (var devise in Devise.values)
            DropdownMenuItem<Devise>(
              child: Text(devise.libelle),
              value: devise,
            ),
        ]);
  }
}
