import { useState } from "react"
import { StyleSheet, View, FlatList, Button } from "react-native"
import GoalItem from "./components/GoalItem"
import GoalInput from "./components/GoalInput"
import { StatusBar } from "expo-status-bar"

export default function App() {
    const [courseGoals, setCourseGoals] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    function startAddGoalHandler() {
        setIsModalVisible(true)
    }

    function endAddGoalHandler() {
        setIsModalVisible(false)
    }

    function addGoalHandler(enteredGoalText) {
        setCourseGoals((prev) => [
            ...prev,
            { text: enteredGoalText, id: Math.random().toString() },
        ])
        endAddGoalHandler()
    }

    function deleteGoalHandler(id) {
        setCourseGoals((prev) => prev.filter((goal) => goal.id !== id))
    }

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.appContainer}>
                <GoalInput
                    onAddGoal={addGoalHandler}
                    visible={isModalVisible}
                    onCancel={endAddGoalHandler}
                />
                <View style={styles.goalsContainer}>
                    <FlatList
                        data={courseGoals}
                        renderItem={(itemData) => {
                            return (
                                <GoalItem
                                    text={itemData.item.text}
                                    onDeleteItem={deleteGoalHandler}
                                    id={itemData.item.id}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => {
                            return item.id
                        }}
                        alwaysBounceVertical={false}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Add New Goal"
                        color="#b180f0"
                        onPress={startAddGoalHandler}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    appContainer: {
        paddingTop: 50,
        paddingHorizontal: 16,
        flex: 1,
    },

    goalsContainer: {
        flex: 5,
    },
    buttonContainer: {
        marginBottom: 40,
    },
})
