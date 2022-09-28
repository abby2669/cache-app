import React from 'react';
import { Text } from "react-native"

export default function Rupee({ size, style }) {
    return (
        <Text style={{ fontSize: size, ...style }}>₹</Text>
    )
}