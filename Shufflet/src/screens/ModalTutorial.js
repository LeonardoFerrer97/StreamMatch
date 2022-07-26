
import { View, Text, Modal } from 'react-native';

const ModalTutorial = ({ open, onClose })  => {
      return (
        <Modal isVisible={open} onBackButtonPress={onClose} onBackdropPress={onClose}>
          <View style = {[style.container]}>
              <Text style = {[style.title]}> Descubra a palavra certa em 6 ou mais tentativas. Depois de cada tentativa, as peças mostram o quão certo você está da resposta </Text>
                  <View pointerEvents={"none"}>
                      <TextInput style={[style.input]}Pudim/>
                      <TextInput style={[style.input]}/>
                      <TextInput style={[style.input]}/>
                      <TextInput style={[style.input]}/>
                      <TextInput style={[style.input]}/>
                    </View>
              <Text style = {[style.title]}> A letra P faz parte da palavra e está na posição certa </Text>
                  <View pointerEvents={"none"}>
                      <TextInput style={[style.input]}Verao/>
                      <TextInput style={[style.input]}/>
                      <TextInput style={[style.input]}/>
                      <TextInput style={[style.input]}/>
                      <TextInput style={[style.input]}/>
                    </View>
              <Text style = {[style.title]}> A letra A faz parte da palavra, mas em outro lugar</Text>
                  <View pointerEvents={"none"}>
                      <TextInput style={[style.input]}Viola/>
                      <TextInput style={[style.input]}/>
                      <TextInput style={[style.input]}/>
                      <TextInput style={[style.input]}/>
                      <TextInput style={[style.input]}/>
                    </View>
              <Text style = {[style.title]}> A letra L faz parte da palavra, mas em outro lugar</Text>
              <Text style = {[style.title]}> Não é necessário se preocupar com acentuação</Text>
              <Text style = {[style.title]}> Há a possibilidade de ter letras repetidas</Text>
              <Text style = {[style.title]}> Uma palavra nova surge por dia.</Text>
              </View>      
        </Modal>     
    );
  }
  
  
  export default ModalHistory;