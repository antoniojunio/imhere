import {
	Alert,
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { styles } from './styles'
import { Participant } from '../../components/Participant'
import { useState } from 'react'

export function Home() {
	const [participants, setParticipants] = useState<string[]>([])
	const [participantName, setParticipantName] = useState<string>('')

	function handleParticipantAdd() {
		if (participants.includes(participantName)) {
			return Alert.alert(
				'Participante existe',
				'já existe um participante com esse nome'
			)
		}
		setParticipants((prevState) => [...prevState, participantName])
		setParticipantName('')
	}

	function handleParticipantRemove(name: string) {
		Alert.alert('Remover participante', `Deseja remover ${name}?`, [
			{
				text: 'Não',
				style: 'cancel',
			},
			{
				text: 'Sim',
				onPress: () =>
					setParticipants((prevState) =>
						prevState.filter((participant) => participant !== name)
					),
			},
		])
	}

	return (
		<View style={styles.container}>
			<Text style={styles.eventName}>Nome do evento</Text>

			<Text style={styles.eventDate}>Sexta, 4 de Junho de 2022.</Text>

			<View style={styles.form}>
				<TextInput
					style={styles.input}
					placeholder="Nome do participante"
					placeholderTextColor="#6B6B6B"
					onChangeText={setParticipantName}
					value={participantName}
				/>

				<TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
					<Text style={styles.buttonText}> + </Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={participants}
				keyExtractor={(participant) => participant}
				renderItem={({ item }) => (
					<Participant
						name={item}
						onRemove={() => handleParticipantRemove(item)}
					/>
				)}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => (
					<Text style={styles.emptyList}>Nenhum participante cadastrado</Text>
				)}
			/>
		</View>
	)
}
