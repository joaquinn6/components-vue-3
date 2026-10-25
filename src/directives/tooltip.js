let tooltipId = 0;

const tooltipState = Symbol("tooltipState");
const placements = ["top", "bottom"];
const defaultPlacement = "top";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePlacement(value) {
  return placements.includes(value) ? value : defaultPlacement;
}

function createTooltipElement() {
  const element = document.createElement("span");
  element.className = "v-tooltip__content";
  element.setAttribute("role", "tooltip");
  element.dataset.placement = defaultPlacement;
  element.id = `tooltip-${++tooltipId}`;
  return element;
}

// Usa el lado preferido si cabe; si no, el opuesto; si ninguno cabe, el de más espacio.
function resolvePlacement(preferred, hostRect, tooltipHeight, viewportPadding) {
  const spaceAbove = hostRect.top - viewportPadding;
  const spaceBelow = window.innerHeight - hostRect.bottom - viewportPadding;
  const needed = tooltipHeight + viewportPadding;
  const fits = { top: spaceAbove >= needed, bottom: spaceBelow >= needed };
  const opposite = preferred === "top" ? "bottom" : "top";

  if (fits[preferred]) return preferred;
  if (fits[opposite]) return opposite;
  return spaceBelow > spaceAbove ? "bottom" : "top";
}

function positionTooltip(el, state) {
  if (!state.tooltip || state.tooltip.hidden) return;

  const hostRect = el.getBoundingClientRect();
  const tooltipRect = state.tooltip.getBoundingClientRect();
  const viewportPadding = 8;
  const halfWidth = tooltipRect.width / 2;
  const placement = resolvePlacement(
    state.placement,
    hostRect,
    tooltipRect.height,
    viewportPadding,
  );
  const left = Math.min(
    Math.max(hostRect.left + hostRect.width / 2, halfWidth + viewportPadding),
    window.innerWidth - halfWidth - viewportPadding,
  );
  const top =
    placement === "top"
      ? Math.max(
          hostRect.top - tooltipRect.height - viewportPadding,
          viewportPadding,
        )
      : Math.max(
          Math.min(
            hostRect.bottom + viewportPadding,
            window.innerHeight - tooltipRect.height - viewportPadding,
          ),
          viewportPadding,
        );

  state.tooltip.dataset.placement = placement;
  state.tooltip.style.left = `${left}px`;
  state.tooltip.style.top = `${top}px`;
}

function updateDescribedBy(el, state) {
  const describedBy = state.originalDescribedBy
    ? `${state.originalDescribedBy} ${state.tooltip.id}`
    : state.tooltip.id;

  el.setAttribute("aria-describedby", describedBy);
}

function removeTooltip(el, state) {
  state.tooltip?.classList.remove("v-tooltip-visible");
  state.tooltip?.remove();
  state.tooltip = undefined;

  if (state.originalDescribedBy)
    el.setAttribute("aria-describedby", state.originalDescribedBy);
  else el.removeAttribute("aria-describedby");
}

function setTooltipText(el, state, value) {
  const text = normalizeText(value);

  if (!text) {
    removeTooltip(el, state);
    return;
  }

  if (!state.tooltip) state.tooltip = createTooltipElement();

  state.tooltip.textContent = text;
  state.tooltip.hidden = true;
  state.tooltip.setAttribute("aria-hidden", "true");
  updateDescribedBy(el, state);

  if (!state.tooltip.isConnected) document.body.appendChild(state.tooltip);
}

function showTooltip(el) {
  const state = el[tooltipState];
  if (!state?.tooltip) return;

  state.tooltip.hidden = false;
  state.tooltip.setAttribute("aria-hidden", "false");
  // Fija el lado sin animarlo para que la entrada parta desde la orientación correcta.
  state.tooltip.style.transition = "none";
  positionTooltip(el, state);
  void state.tooltip.offsetWidth;
  state.tooltip.style.transition = "";
  state.tooltip.classList.add("v-tooltip-visible");
}

function hideTooltip(el) {
  const state = el[tooltipState];
  if (!state?.tooltip) return;

  state.tooltip.hidden = true;
  state.tooltip.setAttribute("aria-hidden", "true");
  state.tooltip.classList.remove("v-tooltip-visible");
}

export const tooltip = {
  mounted(el, binding) {
    const state = {
      originalDescribedBy: el.getAttribute("aria-describedby"),
      tooltip: undefined,
      placement: normalizePlacement(binding.arg),
      show: () => showTooltip(el),
      hide: () => hideTooltip(el),
      reposition: () => positionTooltip(el, state),
    };

    el.addEventListener("mouseenter", state.show);
    el.addEventListener("mouseleave", state.hide);
    el.addEventListener("focusin", state.show);
    el.addEventListener("focusout", state.hide);
    window.addEventListener("resize", state.reposition);
    window.addEventListener("scroll", state.reposition, true);
    el[tooltipState] = state;

    setTooltipText(el, state, binding.value);
  },

  updated(el, binding) {
    const state = el[tooltipState];
    if (!state) return;

    const placement = normalizePlacement(binding.arg);
    if (placement !== state.placement) {
      state.placement = placement;
      positionTooltip(el, state);
    }

    if (binding.value === binding.oldValue) return;

    setTooltipText(el, state, binding.value);
  },

  unmounted(el) {
    const state = el[tooltipState];
    if (!state) return;

    el.removeEventListener("mouseenter", state.show);
    el.removeEventListener("mouseleave", state.hide);
    el.removeEventListener("focusin", state.show);
    el.removeEventListener("focusout", state.hide);
    window.removeEventListener("resize", state.reposition);
    window.removeEventListener("scroll", state.reposition, true);
    removeTooltip(el, state);
    delete el[tooltipState];
  },
};
