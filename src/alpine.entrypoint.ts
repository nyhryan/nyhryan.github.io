import collapse from "@alpinejs/collapse";
import { NanoStores } from "@nanostores/alpine";
import { $accordionStates } from "@utils/store.accordion";
import { type Alpine } from "alpinejs";

export default (Alpine: Alpine) => {
  Alpine.plugin(collapse);
  Alpine.plugin(NanoStores);
  Alpine.magic("accordionStates", () => $accordionStates);
};
