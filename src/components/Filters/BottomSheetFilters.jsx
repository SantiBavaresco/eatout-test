import React, { useRef, useState } from 'react'
import 'react-native-gesture-handler';
import { StyleSheet, View, Button } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import Filters from "../Filters/Filters"

export default function BottonSheetFilters() {
    const bottomSheetModalRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    // const snapPoints = ['30%', '50%', '70%']
    const snapPoints = ['70%']

    const handlePresentModal = () => {
        bottomSheetModalRef.current?.present();
        console.log(bottomSheetModalRef.current)
    }

    const handleBottonSheet = () => {
        bottomSheetModalRef.current.forceClose();
    };


    {/*-------Flor*/ } 
    return (
        <View style={styles.container}>
            {/* <Text>Esta al es de prueba en React Native 12.</Text> */}
            <Button style={styles.itemTitle} title='Filtros' onPress={handlePresentModal} 
            
            />
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={{ borderRadius: 50 }}
                    backgroundOpacity={0}
                    enableDismissOnClose={true}
                    onClose={() => setIsOpen(false)}
                >
                    <View style={styles.contentContainer}>
                        <Filters
                            array={isOpen}
                            handleBottonSheet={handleBottonSheet}
                        />
                    </View>
                </BottomSheetModal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'hsla(240, 100%, 50%, 0)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    title: {
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 20,
        right: 100
    },
    
    itemTitle: {
        color: '#A81337',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: '80%',
        
        padding: 10,
        position: "absolute",
        left: 21,
        bottom: 5,
        borderRadius: 20,
        backgroundColor: "#D9D9D9"
    
    },
});
