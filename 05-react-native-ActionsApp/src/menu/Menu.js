import React from 'react'
import { View, StyleSheet } from 'react-native'
import OptionMenu from './OptionMenu'

/**
 * Composant Menu.
 */
const Menu = ({updateFilter}) => (
    <View style={styles.menu}>
        <OptionMenu updateFilter={() => updateFilter('Toutes')} titre="Toutes"/>
        <OptionMenu updateFilter={() => updateFilter('Actives')} titre="Actives"/>
        <OptionMenu updateFilter={() => updateFilter('Terminees')} titre="Terminées"/>
    </View>
)

const styles = StyleSheet.create({
    menu: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    }
})
export default Menu