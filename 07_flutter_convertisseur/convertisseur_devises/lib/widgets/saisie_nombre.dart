import 'package:flutter/material.dart';
import 'package:convertisseur_devises/styles.dart';

class SaisieNombre extends StatelessWidget {
  final Function onChangeValue;

  const SaisieNombre({Key key, @required this.onChangeValue}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextField(style: AppStyle.inputStyle, onChanged: onChangeValue);
  }
}
