import { Group } from ".";

export default {
  title: "Components/Group",
  component: Group,
  argTypes: {
    property1: {
      options: ["category", "variant-2", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "category",
    className: {},
  },
};
