
import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, ScrollView, Dimensions, Button, Text, TouchableOpacity } from 'react-native'
import StyledText from '../../styles/StyledText/StyledText.jsx'
import { useParams } from 'react-router-native'
import { useDispatch, useSelector } from 'react-redux'
import { searchRestorantById, clearStateResatorantById  } from '../../redux/actions.js'
import { useNavigation } from '@react-navigation/native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';

import Loading from "../Loading/Loading"
import theme from '../../styles/theme.js'

const DetailResto = ({route}) => {
    // const { _id } = useParams();
    const { _id } = route.params;
    const detail = useSelector(state => state?.restorantById)
    const [loading, setLoading] = useState(true)
  console.log("SOY DETAIL: ", _id);
    const dispatch = useDispatch();




    useEffect(() => {
        if(Object?.keys(detail)?.length === 0) { 
            dispatch(searchRestorantById(_id));
            }
        else 
        if(Object?.keys(detail)?.length !== 0)
        { 
          if(detail?._id !== _id){
            // dispatch(clearStateResatorantById())
            dispatch(searchRestorantById(_id));
            setLoading(true)

          }
            else setLoading(false)
        } 
        
    },[detail, loading])

    const navigation = useNavigation();
    function handleCheckOut () {
      console.log("QUIERO IR A MERCADOPAGO");
      const checkout = {
        resto: detail,
        reserve: {
          userId: "aaaaa", // Chequear el stado global del usuario logeado
          cantPersons: 2,
          cantTables: 1, // pasar la cantidad de mesas reservadas (cant de personas/2 - redondear para arriba)
          schedule: "schedule", // la fecha y hora de la reserva
        }
      }
      navigation.navigate("Checkout", checkout)
    }

    return(
        <ScrollView>
            
            {loading ? <Loading/> :
              <View>
                  <Image style={styles?.image} source={{ uri: detail?.images[0] }} />

                  <View style={styles.titleContainer}>
                    <Text style={styles.superTitle}>{detail?.name}</Text>
                  </View>

                  <Text style={styles.text1}>Restaurant - Valor de la reserva: $ {detail?.advance}</Text>

                  <View style={styles.container2}>
                    <View style={styles.iconText}>
                      <IonicIcon
                        name="star-outline"
                        size={20} />
                      <Text style={styles.text1}>{detail?.ranking}</Text>
                    </View>
                    <View style={styles.iconText}>
                      <IonicIcon
                        name="pin-outline"
                        size={20}
                      />
                      <Text style={styles.text1}>{detail?.address?.streetName}</Text>
                    </View>
                  </View>

                  <View style={styles.containerReserva}>
                    <Text style={styles.subTitle}> Hacé tu reserva</Text>

                    <View style={styles.containerPerCalHor}>


                      {/* Cuantas personas ----------------------*/}
                      <View style={styles.containerPersons}>
                        <IonicIcon
                          name="people-outline"
                          size={50}
                          margin={10}

                        />

                        <View style={styles.reservDetail}>
                          <Text style={styles.textReserv2}>¿CUÁNTAS PERSONAS?</Text>
                          <Text style={styles.textReservDetail}>2 personas</Text>
                        </View>

                        <View style={styles.containerButtonsPerson}>

                          <View style={styles.containerButton}>
                            <IonicIcon
                              style={styles.buttonPersons}
                              name="remove-circle-outline"
                              size={37}
                            // onPress
                            />
                          </View>
                          <View style={styles.containerButton}>
                            <IonicIcon
                              style={styles.buttonPersons}
                              name="add-circle-outline"
                              size={37}
                            // onPress
                            />
                          </View>

                        </View>

                      </View>



                      {/* Que dia ?------------------------ */}

                      <View style={styles.containerPersons}>
                        <IonicIcon
                          name="calendar-outline"
                          size={45}
                          margin={10}

                        />


                        <View style={styles.reservDetail}>
                          <Text style={styles.textReserv2}>¿QUÉ DÍA?</Text>
                          <Text style={styles.textReservDetail}>Dom, 2 de Abr -Hoy-</Text>
                        </View>

                        <View style={styles.containerButtonsPerson}>


                          {/* En esta parte deberia tener un picker que me de las opciones disponibles de los dias en que puedo realizar una reserva */}
                          <View style={styles.containerButton}>
                            <IonicIcon
                              name="chevron-down-circle-outline"
                              size={37}
                              // onPress={() => setPickerVisible(true)} 
                              />

                          </View>

                        </View>

                      </View>

                      {/* Qué horario? */}
                      <View style={styles.containerPersons}>
                        <IonicIcon
                          name="time-outline"
                          size={50}
                          margin={10}
                        />
                        <View style={styles.reservDetail}>
                          <Text style={styles.textReserv2}>¿QUÉ HORARIO?</Text>
                        </View>
                        <View style={styles.containerButtonsPerson}>
                          <View >
                          <IonicIcon
                              name="chevron-down-circle-outline"
                              size={37}
                              // onPress={() => setPickerVisible(true)} 
                              />
                          </View>
                        </View>
                      </View>

                      {/* Boton 'CONFIRMAR RESERVA' */}
                      <TouchableOpacity style={styles.confirmButton}
                        onPress={()=>handleCheckOut()}>
                        <IonicIcon
                          name="checkmark-outline"
                          size={20}
                          color={'white'}
                          
                        />
                        {/* {showWebview && (
                            <WebView
                              source={{ uri: 'https://google.com' }}
                              style={{ flex: 1 }}
                            />
                          )} */}
                        <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}>Confimar Reserva</Text>
                      </TouchableOpacity>

        

                    </View>

                      <Text style={styles.title}> Sobre Nosotros</Text>
                      <Text style={styles.title}> {detail?.about} </Text>

                      {/* <Text style={{ paddingLeft: 20 }}>

                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not
                        only five centuries.
                      </Text> */}

                    </View>

                  <View>
                    <Text style={styles.textBody}> Calendario ...</Text>
                    <Text style={styles.textBody}> MENU --- Link a la carta</Text>
                    <Text style={styles.title}> Categorias :</Text>
                    <Text style={styles.textBody}>
                      {" "}
                      -- {detail?.menu[0]} {detail?.diets[0]} {detail?.extras[0]}{" "}
                      {detail?.extras[1]} {detail?.extras[2]}{" "}
                    </Text>
                    <Text style={styles.textBody}>
                      {" "}
                      -- {detail?.section[0]} {detail?.section[1]} {detail?.section[2]}{" "}
                      {detail?.active} {detail?.diets[1]} {detail?.atmosphere[0]}{" "}
                    </Text>
                    <Text style={styles.title}> HORARIOS</Text>
                    <Text style={styles.textBody}>
                      {" "}
                      ---- Lunes --- {detail?.schedule[0]?.monday?.open}hs a{" "}
                      {detail?.schedule[0]?.monday?.close}hs
                    </Text>
                    <Text style={styles.textBody}>
                      {" "}
                      ---- Martes --- {detail?.schedule[0]?.tuesday?.open}hs a{" "}
                      {detail?.schedule[0]?.tuesday?.close}hs
                    </Text>
                    <Text style={styles.textBody}>
                      {" "}
                      ---- Miercoles --- {detail?.schedule[0]?.wednesday?.open}hs a{" "}
                      {detail?.schedule[0]?.wednesday?.close}hs
                    </Text>
                    <Text style={styles.textBody}>
                      {" "}
                      ---- Jueves --- {detail?.schedule[0]?.thursday?.open}hs a{" "}
                      {detail?.schedule[0]?.thursday?.close}hs
                    </Text>
                    <Text style={styles.textBody}>
                      {" "}
                      ---- Viernes --- {detail?.schedule[0]?.friday?.open}hs a{" "}
                      {detail?.schedule[0]?.friday?.close}hs
                    </Text>
                    <Text style={styles.textBody}>
                      {" "}
                      ---- Sabado --- {detail?.schedule[0]?.saturday?.open}hs a{" "}
                      {detail?.schedule[0]?.saturday?.close}hs
                    </Text>
                    <Text style={styles.textBody}>
                      {" "}
                      ---- Domingo --- {detail?.schedule[0]?.sunday?.open}hs a{" "}
                      {detail?.schedule[0]?.sunday?.close}hs
                    </Text>
                    <Text style={styles.title}> Metodos de Pago </Text>
                    <Text style={styles.textBody}>
                      {" "}
                      -- {detail?.paymentMethods[0]}, {detail?.paymentMethods[1]},{" "}
                      {detail?.paymentMethods[2]}
                    </Text>
                  </View>
            </View>

                // :<Loading/>

            } 
                
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    // backgroundColor: 'grey',


  },
  superTitle: {
    fontFamily: "Inria-Sans-Bold",
    fontSize: 35,
  },
  containerReservValue: {
    // padding: 3,
    // backgroundColor: 'red',
  },
  text1: {
    fontFamily: "Inria-Sans-Regular",
    fontSize: 20,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    // backgroundColor: 'blue',
    margin: 0,
  },
  iconText: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: 20,
  },
  subTitle: {
    fontFamily: "Inria-Sans-Bold",
    fontSize: 25,
  },

  containerReserva: {
    // backgroundColor: 'orange',
  },
  containerPerCalHor: {
    // backgroundColor: 'blue',
    width: '100%',
    height: '43.5%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    margin: 0,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: 'black',
    borderStyle: 'dotted',
  },
  containerPersons: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EBE9E9',
    width: '99%',
    height: '22%',
    borderRadius: 20,
    margin: 5,

    elevation: 5, // sombreado en Android
    shadowOffset: { width: 2, height: 2 }, // sombreado en iOS
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  containerButtonsPerson: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  containerButton: {
    backgroundColor: '#FA6B6B',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    margin: 10,


    elevation: 5, // sombreado en Android
    shadowOffset: { width: 2, height: 2 }, // sombreado en iOS
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  buttonPersons: {
    alignSelf: 'center',
    marginLeft: 1,
  },


  textReserv2: {
    fontFamily: "Inria-Sans-Regular",
    fontSize: 20,
    // backgroundColor: 'yellow',
    marginLeft: 2,
    marginTop: 10,

  },
  reservDetail: {
    // backgroundColor: 'green',
    alignItems: 'center',
  },
  textReservDetail: {
    fontFamily: 'Inria-Sans-Bold',
    fontSize: 20,
    marginLeft: 5,
    marginTop: 5,
  },

  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  tinyLetter: {
    fontFamily: "Inria-Sans-Light",
    fontSize: 20,
  },
  title: {
    fontFamily: "Inria-Sans-Regular",
    fontSize: 25,
  },
  textBody: {
    fontFamily: "Inria-Sans-Regular",
    fontSize: 20,
    marginTop: 5,
    justifyContent: 'center',
  },
  confirmButton: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 40,
    width: 160,
    marginTop: 5,

    elevation: 5,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 10,

  },

});
export default DetailResto
