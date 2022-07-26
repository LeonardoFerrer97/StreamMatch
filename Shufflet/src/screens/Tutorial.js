
import { View, Text, StyleSheet,TextInput } from 'react-native';
const Tutorial = ()  => {
      return (
          <View style = {[style.container]}>
              <Text style = {[style.title]}> Descubra a palavra certa em 6 ou mais tentativas. </Text>
              <Text style = {[style.title]}> Depois de cada tentativa, as peças mostram o quão perto você está da resposta </Text>
                    <View style = {[style.form]}  pointerEvents={"none"}>
                      <TextInput style={[style.input,{backgroundColor: '#3fba29'}]} value="P"/>
                      <TextInput style={[style.input]} value="U"/>
                      <TextInput style={[style.input]} value="D"/>
                      <TextInput style={[style.input]} value="I"/>
                      <TextInput style={[style.input]} value="M"/>
                    </View>
              <Text style = {[style.title]}> A letra P faz parte da palavra e está na posição certa </Text>
                  <View style = {[style.form]}  ointerEvents={"none"}>
                      <TextInput style={[style.input]} value="V"/>
                      <TextInput style={[style.input]} value="E"/>
                      <TextInput style={[style.input]} value="R"/>
                      <TextInput style={[style.input,{backgroundColor: '#fff700'}]} value="A"/>
                      <TextInput style={[style.input]} value="O"/>
                    </View>
              <Text style = {[style.title]}> A letra A faz parte da palavra, mas em outro lugar</Text>
                    <View style = {[style.form]}  pointerEvents={"none"}>
                      <TextInput style={[style.input]} value="V"/>
                      <TextInput style={[style.input]} value="I"/>
                      <TextInput style={[style.input]} value="O"/>
                      <TextInput style={[style.input,{backgroundColor: 'gray'}]} value="L"/>
                      <TextInput style={[style.input]} value="A"/>
                      </View>
              <Text style = {[style.title]}> A letra L não faz parte da palavra.</Text>
              <Text style = {[style.title]}> Não é necessário se preocupar com acentuação.</Text>
              <Text style = {[style.title]}> Há a possibilidade de ter letras repetidas.</Text>
              <Text style = {[style.title]}> Uma palavra nova surge por dia.</Text>
            </View>      
    );
  }
  const style = StyleSheet.create({
    container: {
      flex : 1,
      flexDirection : 'column',
    },
    title:{
      color:'grey',
      flex:1,
      alignSelf: 'center',
      margin: 'auto',
      fontSize:30
    }, 
    form: {
      justifyContent:'center',
      flexDirection:'row'
    },
    input: { 
      fontSize: '200%',
      maxWidth: '15%',
      height: 'auto',
      textAlign:'center',
      marginRight:5,
      marginLeft:5,
      marginBottom:0,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      flex:1
    },
    button: {
      backgroundColor: '#228CDB'
    }
  })
  
  export default Tutorial;