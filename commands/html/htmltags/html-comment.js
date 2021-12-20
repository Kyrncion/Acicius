module.exports.run = async (bot, message, args) => {
  message.channel.send({
    embeds: [
      {
        color: "#5599ff",
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL(),
        },
        title: "<!--...-->",
        url: "https://www.w3schools.com/TAGS/tag_comment.asp",
        description:
          "The comment tag is used to insert comments in the source code. Comments are not displayed in the browsers.",
        fields: [
          {
            name: "Definition and Usage",
            value:
              "You can use comments to explain your code, which can help you when you edit the source code at a later date. This is especially useful if you have a lot of code.",
            inline: false,
          },
          {
            name: "Tips and Notes",
            value:
              "You can use the comment tag to hide scripts from browsers without support for scripts (so they don't show them as plain text)",
            inline: true,
          },
          {
            name: "Standard Attributes",
            value:
              "The comment tag does not support any standard attributes. More information about [Standard Attributes.](https://www.w3schools.com/TAGS/ref_standardattributes.asp)",
            inline: true,
          },
          {
            name: "Event Attributes",
            value:
              "The comment tag does not support any event attributes. More information about [Event Attributes.](https://www.w3schools.com/TAGS/ref_eventattributes.asp)",
            inline: true,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: "Learn HTML at W3Schools.com",
        },
      },
    ],
  });
};

module.exports.help = {
  name: "html-comment",
};
