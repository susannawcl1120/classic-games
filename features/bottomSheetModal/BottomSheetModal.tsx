import { images } from "@/constants/Images";
import { palette } from "@/theme/colors";
import { metrics } from "@/theme/metrics";
import { fontSize } from "@/theme/typography";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { Image } from "expo-image";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomBackdrop from "./CustomBackdrop";

interface BottomSheetModalProps {
  /** 控制底部表單的可見性 */
  isVisible: boolean;
  /** 關閉事件處理函數 */
  onClose: () => void;
  /** 底部表單的內容 */
  children: ReactNode;
  /** 是否使用 Header */
  header?: boolean;
  /** Header標題 */
  headerTitle?: string;
  /** 是否顯示關閉按鈕 */
  showCloseBtn?: boolean;
  /** 最低高度 */
  minHeight?: number;
  snapPoints?: number;
  showHandleIndicator?: boolean;
  headerLeftSlot?: React.ReactNode;
  /** 是否可滾動 */
  scrollable?: boolean;
}

function BottomSheetHeader({
  close,
  headerTitle,
  showCloseBtn,
  showHandleIndicator,
  headerLeftSlot,
}: {
  close: () => void;
  headerTitle?: string;
  showCloseBtn?: boolean;
  showHandleIndicator?: boolean;
  headerLeftSlot: React.ReactNode;
}) {
  return (
    <View
      style={[
        styles.header,
        !showHandleIndicator && { padding: metrics.spacing.md },
      ]}
    >
      {headerLeftSlot && (
        <View
          style={[
            styles.headerLeftSlot,
            !showHandleIndicator && { top: metrics.spacing.md },
          ]}
        >
          {headerLeftSlot}
        </View>
      )}
      <Text style={styles.headerTitleText}>{headerTitle}</Text>
      {showCloseBtn && (
        <Pressable
          onPress={close}
          style={[
            styles.closeIconContainer,
            !showHandleIndicator && { top: metrics.spacing.md },
          ]}
        >
          <Image source={images.close} style={styles.closeIcon} />
        </Pressable>
      )}
    </View>
  );
}

function BaseBottomSheetModal({
  isVisible,
  onClose,
  children,
  header,
  headerTitle,
  showCloseBtn = true,
  minHeight,
  snapPoints = 0.6,
  showHandleIndicator = true,
  headerLeftSlot,
  scrollable = false,
}: BottomSheetModalProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[metrics.screenHeight * snapPoints]}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        backdropComponent={(props) => (
          <CustomBackdrop isVisible={isVisible} {...props} />
        )}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={true}
        handleComponent={showHandleIndicator ? undefined : () => null}
      >
        {(() => {
          const containerStyle = [
            styles.areaBottomSheet,
            { minHeight: minHeight || metrics.screenHeight * snapPoints },
          ];

          const headerComponent = header && (
            <BottomSheetHeader
              close={onClose}
              headerTitle={headerTitle}
              showCloseBtn={showCloseBtn}
              showHandleIndicator={showHandleIndicator}
              headerLeftSlot={headerLeftSlot}
            />
          );

          if (scrollable) {
            return (
              <BottomSheetScrollView style={containerStyle}>
                {headerComponent}
                {children}
              </BottomSheetScrollView>
            );
          }

          return (
            <BottomSheetView style={containerStyle}>
              {headerComponent}
              {children}
            </BottomSheetView>
          );
        })()}
      </BottomSheet>
    </Portal>
  );
}

const styles = StyleSheet.create({
  areaBottomSheet: {
    flex: 1,
  },
  headerContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: metrics.spacing.md,
    paddingBottom: metrics.spacing.md,
    marginBottom: metrics.spacing.sm,
    flexDirection: "row",
  },
  headerTitleText: {
    textAlign: "center",
    flex: 1,
    color: palette.neutral[1000],
    fontFamily: "PingFang TC",
    ...fontSize[16],
    fontWeight: 600,
  },
  closeIconContainer: {
    position: "absolute",
    right: metrics.spacing.md,
    zIndex: 1,
  },
  closeIcon: {
    width: metrics.wp(16),
    height: metrics.hp(16),
  },
  headerLeftSlot: {
    position: "absolute",
    left: metrics.spacing.md,
    zIndex: 1,
  },
});

export default BaseBottomSheetModal;
