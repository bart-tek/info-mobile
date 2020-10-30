import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        actions: [],
        filtre: 'Toutes'
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        this.state.texteSaisie = nouvelleSaisie;
    }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerNouvelleAction() {
        
        if (this.state.actions.map((action) => {return action.title} ).includes(this.state.texteSaisie)) {
            console.log("Une action avec ce nom existe déjà !")
        }
        else {
            this.setState({ 
                actions: this.state.actions.concat({ 
                    title: this.state.texteSaisie, 
                    isTerminated: false 
                }) 
            })
        }
    }

    terminerAction = (action) => {

        var index = this.state.actions.indexOf(action);

        if (this.state.actions[index].isTerminated) {
            this.state.actions[index].isTerminated = false;
        } else {
            this.state.actions[index].isTerminated = true;
        }
        this.setState(this.state.actions);
    }

    supprimerAction = (action) => {
        this.setState(this.state.actions, () => {
            var index = this.state.actions.indexOf(action);
            this.state.actions.splice(index, 1);
        });
    }

    updateFilter = (newFilter) => {
        this.setState({ filtre: newFilter });
    }

    render() {
        const {texteSaisie, actions, filtre} = this.state

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Entete/>
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)}/>
                    <ListeActions actions={actions} filtre={filtre} onTerminer={this.terminerAction} onSupprimer={this.supprimerAction}/>
                    <BoutonCreer onValider={() => this.validerNouvelleAction()}/>
                </ScrollView>
                <Menu updateFilter={this.updateFilter} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})