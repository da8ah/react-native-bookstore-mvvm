import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Book } from "../core/entities/Book"

type RootStackParamList = {
    Books: undefined,
    New: undefined
    Login: { books: Book[] },
    Cart: { token: string, books: Book[] },
    Payment: { token: string, price: string }
}

export type HomeBooksScreenProps = NativeStackScreenProps<RootStackParamList, 'Books'>
export type AddBookScreenProps = NativeStackScreenProps<RootStackParamList, 'New'>
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>
export type CartScreenProps = NativeStackScreenProps<RootStackParamList, 'Cart'>
export type PaymentScreenProps = NativeStackScreenProps<RootStackParamList, 'Payment'>