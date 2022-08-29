import { RouteProp } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

type RootStackParamList = {
    Books: undefined,
    New: undefined
    Login: undefined,
    Cart: undefined,
    Payment: undefined
}

type CartScreenParamList = {
    props: { token: string }
}

export type HomeBooksScreenProps = NativeStackScreenProps<RootStackParamList, 'Books'>
export type AddBookScreenProps = NativeStackScreenProps<RootStackParamList, 'New'>
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Cart'>
export type CartScreenProps = NativeStackScreenProps<RootStackParamList, 'Payment'>