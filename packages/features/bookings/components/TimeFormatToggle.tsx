import { useLocale } from "@calcom/lib/hooks/useLocale";
import { TimeFormat } from "@calcom/lib/timeFormat";
import { ToggleGroup } from "@calcom/ui/components/form";

import { useTimePreferences } from "@calcom/features/bookings/lib";

const KINTELLO_HIDE_TIME_FORMAT_TOGGLE = true;

export const TimeFormatToggle = ({ customClassName }: { customClassName?: string }) => {
  // Kintello: Umschalter 12/24 Std ausgeblendet, in Deutschland gilt durchgehend 24 Std
  if (KINTELLO_HIDE_TIME_FORMAT_TOGGLE) return null;
  const timeFormat = useTimePreferences((state) => state.timeFormat);
  const setTimeFormat = useTimePreferences((state) => state.setTimeFormat);
  const { t } = useLocale();

  return (
    <ToggleGroup
      customClassNames={customClassName}
      onValueChange={(newFormat) => {
        if (newFormat && newFormat !== timeFormat) setTimeFormat(newFormat as TimeFormat);
      }}
      defaultValue={timeFormat}
      value={timeFormat}
      aria-label={t("time_format")}
      options={[
        { value: TimeFormat.TWELVE_HOUR, label: t("12_hour_short") },
        { value: TimeFormat.TWENTY_FOUR_HOUR, label: t("24_hour_short") },
      ]}
    />
  );
};
