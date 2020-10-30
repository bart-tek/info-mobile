import React from 'react'
import { FlatList } from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({actions, filtre, onTerminer, onSupprimer}) => {
    
    const renderItem = ({ item }) => {

        if (filtre == "Toutes") {
            return (
                <UneAction 
                titre={item.title} 
                isTerminated={item.isTerminated}
                onSupprimer={() => onSupprimer(item)} 
                onTerminer={() => onTerminer(item)}/>
            );
        }
        else if (filtre == "Terminees" && item.isTerminated) {
            return (
                <UneAction 
                titre={item.title} 
                isTerminated={item.isTerminated}
                onSupprimer={() => onSupprimer(item)} 
                onTerminer={() => onTerminer(item)}/>
            );
        }
        else if (filtre == "Actives" && !item.isTerminated) {
            return (
                <UneAction 
                titre={item.title} 
                isTerminated={item.isTerminated}
                onSupprimer={() => onSupprimer(item)} 
                onTerminer={() => onTerminer(item)}/>
            );
        }
    };

    return (
        <FlatList
            data={actions}
            renderItem={renderItem}
            keyExtractor={item => item.title}
        />
    );
}

export default ListeActions