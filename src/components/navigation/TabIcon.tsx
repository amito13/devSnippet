import {
  StyleSheet,
  View,
} from "react-native";

type TabIconName =
  | "home"
  | "favorites"
  | "files"
  | "settings";

type Props = {
  name: TabIconName;
  color: string;
  focused: boolean;
};

export default function TabIcon({
  name,
  color,
  focused,
}: Props) {
  return (
    <View
      style={[
        styles.frame,
        focused && {
          backgroundColor: `${color}22`,
        },
      ]}
    >
      {name === "home" && (
        <View style={styles.homeIcon}>
          <View
            style={[
              styles.homeRoof,
              {
                borderBottomColor: color,
              },
            ]}
          />
          <View
            style={[
              styles.homeBody,
              {
                borderColor: color,
              },
            ]}
          />
          <View
            style={[
              styles.homeSpark,
              {
                backgroundColor: color,
              },
            ]}
          />
        </View>
      )}

      {name === "favorites" && (
        <View style={styles.orbitIcon}>
          <View
            style={[
              styles.orbitRing,
              {
                borderColor: color,
              },
            ]}
          />
          <View
            style={[
              styles.orbitDot,
              {
                backgroundColor: color,
              },
            ]}
          />
          <View
            style={[
              styles.orbitCore,
              {
                backgroundColor: color,
              },
            ]}
          />
        </View>
      )}

      {name === "files" && (
        <View style={styles.fileIcon}>
          <View
            style={[
              styles.fileBack,
              {
                borderColor: color,
              },
            ]}
          />
          <View
            style={[
              styles.fileFront,
              {
                borderColor: color,
              },
            ]}
          >
            <View
              style={[
                styles.fileLine,
                {
                  backgroundColor: color,
                },
              ]}
            />
            <View
              style={[
                styles.fileLineShort,
                {
                  backgroundColor: color,
                },
              ]}
            />
          </View>
        </View>
      )}

      {name === "settings" && (
        <View style={styles.dialIcon}>
          <View
            style={[
              styles.dialRing,
              {
                borderColor: color,
              },
            ]}
          />
          <View
            style={[
              styles.dialNeedle,
              {
                backgroundColor: color,
              },
            ]}
          />
          <View
            style={[
              styles.dialDot,
              {
                backgroundColor: color,
              },
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 34,
    height: 34,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  homeIcon: {
    width: 22,
    height: 22,
    alignItems: "center",
  },

  homeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 9,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },

  homeBody: {
    width: 16,
    height: 12,
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  homeSpark: {
    position: "absolute",
    right: 1,
    top: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
  },

  orbitIcon: {
    width: 23,
    height: 23,
    alignItems: "center",
    justifyContent: "center",
  },

  orbitRing: {
    width: 22,
    height: 14,
    borderWidth: 2,
    borderRadius: 999,
    transform: [
      {
        rotate: "-28deg",
      },
    ],
  },

  orbitDot: {
    position: "absolute",
    top: 2,
    right: 3,
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  orbitCore: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  fileIcon: {
    width: 23,
    height: 23,
  },

  fileBack: {
    position: "absolute",
    left: 1,
    top: 2,
    width: 15,
    height: 17,
    borderWidth: 2,
    borderRadius: 4,
    opacity: 0.55,
  },

  fileFront: {
    position: "absolute",
    right: 1,
    bottom: 1,
    width: 15,
    height: 17,
    borderWidth: 2,
    borderRadius: 4,
    paddingTop: 5,
    paddingHorizontal: 3,
    gap: 3,
  },

  fileLine: {
    height: 2,
    borderRadius: 999,
  },

  fileLineShort: {
    width: 6,
    height: 2,
    borderRadius: 999,
  },

  dialIcon: {
    width: 23,
    height: 23,
    alignItems: "center",
    justifyContent: "center",
  },

  dialRing: {
    width: 21,
    height: 21,
    borderWidth: 2,
    borderRadius: 11,
  },

  dialNeedle: {
    position: "absolute",
    width: 3,
    height: 11,
    borderRadius: 999,
    transform: [
      {
        rotate: "42deg",
      },
    ],
  },

  dialDot: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
  },
});
