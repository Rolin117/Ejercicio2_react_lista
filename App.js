import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  // Estados para los datos del alumno y la lista de alumnos
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [materiaFavorita, setMateriaFavorita] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [alumnos, setAlumnos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Estados para el DateTimePicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // Función para manejar el cambio de fecha
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setFechaNacimiento(currentDate);
  };

  // Mostrar el picker de fecha
  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  // Función para agregar un alumno
  const agregarAlumno = () => {
    const nuevoAlumno = {
      id: alumnos.length + 1,
      nombre,
      carnet,
      materiaFavorita,
      fechaNacimiento
    };
    setAlumnos([...alumnos, nuevoAlumno]);
    setNombre('');
    setCarnet('');
    setMateriaFavorita('');
    setFechaNacimiento(new Date());
    setModalVisible(false);
  };

  // Función para eliminar un alumno
  const eliminarAlumno = (id) => {
    setAlumnos(alumnos.filter(alumno => alumno.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button title="Agregar Alumno" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Alumno"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Carnet"
              value={carnet}
              onChangeText={setCarnet}
            />
            <TextInput
              style={styles.input}
              placeholder="Materia Favorita"
              value={materiaFavorita}
              onChangeText={setMateriaFavorita}
            />
            <TouchableOpacity onPress={showDatepicker}><Text style={styles.Fecha}>Fecha de Nacimiento</Text></TouchableOpacity>
            <Text>Seleccionada: {fechaNacimiento.toLocaleDateString()}</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                locale='es-ES'
              />
            )}
            <Button title="Agregar Alumno" onPress={agregarAlumno} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={alumnos}
        renderItem={({ item }) => (
          <View style={styles.alumnoItem}>
            <Text style={styles.alumnoNombre}>{item.nombre} - {item.carnet}</Text>
            <Text>Materia Favorita: {item.materiaFavorita}</Text>
            <Text>Fecha de Nacimiento: {item.fechaNacimiento.toDateString()}</Text>
            <TouchableOpacity
              style={styles.botonEliminar}
              onPress={() => eliminarAlumno(item.id)}
            >
              <Text style={styles.textoBotonEliminar}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  alumnoItem: {
    backgroundColor: '#FFF',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  alumnoNombre: {
    fontSize: 18,
    color: '#333',
  },
  botonEliminar: {
    padding: 10,
    backgroundColor: '#BE4200',
    borderRadius: 5,
  },
  textoBotonEliminar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  Fecha: {
    fontSize: 15,
    color: '#000',
  }
});

export default App;
