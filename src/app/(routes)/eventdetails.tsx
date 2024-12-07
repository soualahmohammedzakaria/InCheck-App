import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Button from '@/components/global/Button';
import { colors } from '@/constants/colors';

export default function EventDetails() {
    const participants = [
        { id: 1, name: 'John Doe', status: 'Present' },
        { id: 2, name: 'Jane Doe', status: 'Pending' },
        { id: 3, name: 'John Smith', status: 'Absent' },
        { id: 4, name: 'Jane Smith', status: 'Present' },
        { id: 5, name: 'John Doe', status: 'Present' },
        { id: 6, name: 'Jane Doe', status: 'Pending' },
        { id: 7, name: 'John Smith', status: 'Absent' },
        { id: 8, name: 'Jane Smith', status: 'Present' },
        { id: 9, name: 'John Doe', status: 'Present' },
        { id: 10, name: 'Jane Doe', status: 'Pending' },
        { id: 11, name: 'John Smith', status: 'Absent' },
        { id: 12, name: 'Jane Smith', status: 'Present' },
        { id: 13, name: 'John Doe', status: 'Present' },
        { id: 14, name: 'Jane Doe', status: 'Pending' },
        { id: 15, name: 'John Smith', status: 'Absent' },
        { id: 16, name: 'Jane Smith', status: 'Present' },
        { id: 17, name: 'John Doe', status: 'Present' },
        { id: 18, name: 'Jane Doe', status: 'Pending' },
        { id: 19, name: 'John Smith', status: 'Absent' },
        { id: 20, name: 'Jane Smith', status: 'Present' },
        { id: 21, name: 'John Doe', status: 'Present' },
        { id: 22, name: 'Jane Doe', status: 'Pending' },

    ];

    const { event: paramsEvent } = useLocalSearchParams();
    const event = JSON.parse(paramsEvent as string);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <Pressable
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5, padding: 10 }}
                onPress={() => router.back()}
            >
                <Entypo name="chevron-left" size={32} color={colors.black} />
                <Text style={{ fontSize: 24, fontFamily: 'Poppins-SemiBold' }}>
                    {event.name}
                </Text>
            </Pressable>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    width: '100%',
                    height: "auto",
                    marginBottom: 40,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    flexDirection: 'column',
                    gap: 10
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome6 name="location-crosshairs" size={24} color={colors.black} />
                    <Text
                        style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 16,
                        marginLeft: 5,
                        flexShrink: 1,
                        flexWrap: 'wrap',
                        }}
                    >
                        Location: {event.location}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="calendar" size={25} color={colors.black} />
                    <Text
                        style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 16,
                        marginLeft: 5,
                        flexShrink: 1,
                        flexWrap: 'wrap',
                        }}
                    >
                        Date: {event.date}
                    </Text>
                </View>
                <Button 
                    title="Start Check-In" onPress={() => router.push({
                        pathname: '/(routes)/scaneventcode',
                        params: { event_id: event.id.toString() },
                        })
                    }
                    //disabled={event.date < new Date()}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold' }}>
                        Participant
                    </Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold' }}>
                        Status
                    </Text>
                </View>
                <View
                    style={{
                    height: 2,
                    width: '100%',
                    backgroundColor: colors.black,
                    borderRadius: 20,
                    alignSelf: 'center',
                    marginVertical: -4,
                    }}
                />
                <View
                    style={{
                        height: "auto",
                    }}
                >
                    {participants.map((participant) => (
                        <View
                            key={participant.id}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>
                                {participant.name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'Poppins-SemiBold',
                                    color: participant.status === 'Present' ? 'green' : participant.status === 'Absent' ? 'red' : colors.black,
                                }}>
                                {participant.status}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}