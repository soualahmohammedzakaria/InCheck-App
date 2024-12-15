import { colors } from "@/constants/colors";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AddInviteeProps {
  users: User[];
  onInvite: (invitees: number[]) => void;
  invitees: number[];
  onChangeSelectionMode: (allMembers: boolean) => void;
  allMembers: boolean;
}

export default function AddInvitee({
  users,
  onInvite,
  invitees,
  onChangeSelectionMode,
  allMembers,
}: AddInviteeProps) {
  const toggleUserSelection = (id: number) => {
    const updatedinvitees = invitees.includes(id)
      ? invitees.filter((userId) => userId !== id)
      : [...invitees, id];
    onInvite(updatedinvitees);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite Users</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, allMembers && styles.optionSelected]}
          onPress={() => {
            onChangeSelectionMode(true);
            const allUserIds = users.map((user) => user.id);
            onInvite(allUserIds);
          }}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.optionText, allMembers && styles.optionTextSelected]}
          >
            Invite all users
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, !allMembers && styles.optionSelected]}
          onPress={() => {
            onChangeSelectionMode(false);
            onInvite([]);
          }}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.optionText,
              !allMembers && styles.optionTextSelected,
            ]}
          >
            Select users
          </Text>
        </TouchableOpacity>
      </View>
      {!allMembers && (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          style={styles.userList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.userItem,
                invitees.includes(item.id) && styles.userItemSelected,
              ]}
              onPress={() => toggleUserSelection(item.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.userName,
                  invitees.includes(item.id) && styles.userNameSelected,
                ]}
              >
                {item.first_name} {item.last_name} ({item.email})
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
    flex: 1,
    marginTop: -10,
  },
  title: {
    fontSize: 20,
    marginLeft: 5,
    color: colors.black,
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  option: {
    flex: 1,
    padding: 14,
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.lightGrey,
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: colors.black,
  },
  optionText: {
    color: colors.black,
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  optionTextSelected: {
    color: colors.white,
  },
  userList: {
    flex: 1,
    marginTop: 0,
  },
  userItem: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: colors.lightGrey,
    marginVertical: 5,
  },
  userItemSelected: {
    backgroundColor: colors.black,
  },
  userName: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: colors.black,
  },
  userNameSelected: {
    color: colors.white,
  },
});
