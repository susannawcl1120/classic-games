import BaseBottomSheetModal from "@/features/bottomSheetModal/BottomSheetModal";
import { palette } from "@/theme/colors";
import { metrics } from "@/theme/metrics";
import { theme } from "@/theme/theme";
import { fontSize } from "@/theme/typography";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  options: { label: string; value: string }[];
  checkedValue: string;
  handleUpdateValue: (value: string) => void;
  title: string;
  firstOption?: string;
};

function DropdownText({
  text,
  onPress,
  visible,
  setVisible,
  options,
  checkedValue,
  handleUpdateValue,
  title,
  firstOption,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Pressable style={styles.dropdownBtn} onPress={onPress}>
        <Text style={styles.dropdownText}>{text}</Text>
      </Pressable>
      <BaseBottomSheetModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        header
        headerTitle={title}
        showHandleIndicator={false}
      >
        <View style={styles.container}>
          {firstOption && (
            <Text style={styles.option}>
              <Text style={styles.optionText}>{t(firstOption)}</Text>
            </Text>
          )}

          {options.map((option) => (
            <Pressable
              style={styles.option}
              key={option.value}
              onPress={() => handleUpdateValue(option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  checkedValue === option.value && styles.activeOptionText,
                ]}
              >
                {t(option.label)}
              </Text>
              {checkedValue === option.value && <Text>✓</Text>}
            </Pressable>
          ))}
        </View>
      </BaseBottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  dropdownBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    color: theme.colors.text.inverse,
    ...fontSize[12],
    fontWeight: 600,
    fontFamily: "PingFang TC",
  },
  dropdownIcon: {
    width: metrics.wp(14),
    height: metrics.hp(14),
  },
  container: {
    paddingHorizontal: metrics.spacing.md,
    paddingBottom: metrics.spacing.lg,
  },
  option: {
    padding: metrics.spacing.md,
    paddingLeft: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.lighter,
  },
  optionText: {
    color: palette.neutral[1000],
    ...fontSize[16],
  },
  activeOptionText: {
    color: "#FF6B20",
    fontWeight: 600,
  },
  checkedIcon: {
    width: metrics.wp(24),
    height: metrics.wp(24),
  },
});

export default DropdownText;
