import 'package:flutter/material.dart';

void main() => runApp(MonApplication());

class MonApplication extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
            appBar: AppBar(
                title: Text('Bonjour App'), backgroundColor: Color(0xFFb74093)),
            body: SingleChildScrollView(
                child: Center(
                    child: Column(
              children: [
                Text('Bonjour',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFFb74093),
                        fontSize: 40)),
                Text('Je suis Bart',
                    style: TextStyle(color: Color(0xFFb74093), fontSize: 30)),
                Image.network(
                  "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
                  height: 350,
                  width: 350,
                ),
                BoutonContactezMoi()
              ],
            )))));
  }
}

class BoutonContactezMoi extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
        onPressed: () => showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text('Contactez-moi'),
                content: Text('Je suis joignable à l\'IMT Atlantique'),
              );
            }),
        child: Text("Contactez-moi !"));
  }
}
