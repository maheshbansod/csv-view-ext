const EXT_PAGE = chrome.runtime.getURL("/index.html");
const RULES = [{
    id: 1,
    action: {
        type: "redirect",
        redirect: { regexSubstitution: EXT_PAGE + "#\\0" },
    },
    condition: {
        regexFilter: "^.+\\.csv(\\?.*)?$",
        resourceTypes: ["main_frame", "sub_frame"],
    },
}];
chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: RULES.map((r) => r.id),
    addRules: RULES,
});

