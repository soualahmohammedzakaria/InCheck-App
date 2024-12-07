import { colors } from '@/constants/colors';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

type User = {
  id: number;
  name: string;
  email: string;
};

interface AddInviteeProps {
  users: User[];
  onInvite: (selectedUsers: number[]) => void;
}

export default function AddInvitee({ users, onInvite }: AddInviteeProps) {
  const [selectedOption, setSelectedOption] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const toggleUserSelection = (id: number) => {
    const updatedSelectedUsers = selectedUsers.includes(id)
      ? selectedUsers.filter((userId) => userId !== id)
      : [...selectedUsers, id];
    setSelectedUsers(updatedSelectedUsers);
    onInvite(updatedSelectedUsers);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite Users</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'all' && styles.optionSelected]}
          onPress={() => {
            setSelectedOption('all');
            const allUserIds = users.map((user) => user.id);
            setSelectedUsers(allUserIds);
            onInvite(allUserIds);
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionText, selectedOption === 'all' && styles.optionTextSelected]}>
            Invite all users
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'select' && styles.optionSelected]}
          onPress={() => {
            setSelectedOption('select');
            setSelectedUsers([]);
            onInvite([]);
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionText, selectedOption === 'select' && styles.optionTextSelected]}>
            Select users
          </Text>
        </TouchableOpacity>
      </View>
      {selectedOption === 'select' && (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          style={styles.userList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.userItem,
                selectedUsers.includes(item.id) && styles.userItemSelected,
              ]}
              onPress={() => toggleUserSelection(item.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.userName,
                  selectedUsers.includes(item.id) && styles.userNameSelected,
                ]}
              >
                {item.name} ({item.email})
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
    flexDirection: 'column',
    gap: 10,
    flex: 1,
    marginTop: -10,
  },
  title: {
    fontSize: 20,
    marginLeft: 5,
    color: colors.black,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    padding: 14,
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.lightGrey,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: colors.black,
  },
  optionText: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.black,
  },
  userNameSelected: {
    color: colors.white,
  },
});