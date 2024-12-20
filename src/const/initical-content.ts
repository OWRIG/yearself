const initialContent = [
  {
    type: "heading",
    content: "年终总结",
  },
  {
    type: "paragraph",
    content: "好好总结一下吧",
  },
  {
    type: "paragraph",
    content:
      "请根据引导，列出大纲，完成对这一年的所思所想，完成文档即可自动生成总结～",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "⬇️ 请在以下模板区域修改大纲",
        styles: {
          italic: true,
          textColor: "gray",
        },
      },
    ],
  },
  {
    type: "heading",
    props: {
      level: 3,
    },
    content: "事件记录",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "今年发生的重要事件有哪些？随便列举，不需要太详细",
        styles: {
          bold: true,
        },
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "有哪些值得记录的事情？",
        styles: {
          bold: true,
        },
      },
    ],
  },
  {
    type: "heading",
    props: {
      level: 3,
    },
    content: "思考复盘",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "有哪些经历给你带来了改变？有学到什么重要的认识吗？",
        styles: {
          bold: true,
        },
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "现在回看，有没有什么新的理解？",
        styles: {
          bold: true,
        },
      },
    ],
  },
  {
    type: "heading",
    props: {
      level: 3,
    },
    content: "简要展望",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "明年最想实现的1-2个目标是什么？",
        styles: {
          bold: true,
        },
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "打算如何行动？",
        styles: {
          bold: true,
        },
      },
    ],
  },
  {
    type: "heading",
    props: {
      level: 3,
    },
    content: "总结",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "请用几句话总结和展望一下这一年",
        styles: {
          bold: true,
        },
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "⬇️ 以下区域将自动生成总结",
        styles: {
          italic: true,
          textColor: "gray",
        },
      },
    ],
  },
  {
    type: "paragraph",
  },
];

// 【年终总结精简框架】

// 事件记录部分：

// 今年发生的重要事件有哪些？随便列举，不用太详细
// 哪些经历让你印象特别深刻？
// 完成了哪些值得记录的事情？
// 思考复盘部分：

// 这些经历给你带来了什么改变？
// 你学到了什么重要的认识？
// 现在回看，有什么新的理解？
// 简要展望部分：

// 明年最想实现的1-2个目标是什么？
// 打算如何行动？
// 原则：

// 答案无对错，想到什么写什么
// 不必面面俱到，重点记录对自己有意义的
// 保持开放性，可以随时补充修改

export default initialContent;
