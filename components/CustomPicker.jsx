import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({
  selectedValue,
  onValueChange,
  options,
  placeholder,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => setShowPicker(!showPicker)}
      >
        <Text style={styles.selectedText}>{selectedValue || placeholder}</Text>
      </TouchableOpacity>
      {showPicker && options ? (
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            setShowPicker(false);
            onValueChange(itemValue, itemIndex);
          }}
          itemStyle={{ fontSize: 14 }}
        >
          {options.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: "#F2F2F2",
    borderColor: "#7D7C7C",
    borderWidth: 1,
  },
  touchableOpacity: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
  selectedText: {
    color: "#000000",
    fontSize: 14,
    marginVertical: 12,
  },
  picker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
});

export default CustomPicker;
