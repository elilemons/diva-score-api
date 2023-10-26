import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import inlineCSS from "inline-css";
import payload from "payload";

const template = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
const getHTML = Handlebars.compile(template);

type Args = {
  from: string;
  to: string;
  subject: string;
  data: {
    headline: string;
    content: string;
    cta?: {
      url: string;
      buttonLabel: string;
    };
  };
  preCompileData?: {
    [key: string]: string;
  };
};

export const sendTemplatedEmail = async ({
  from,
  to,
  subject,
  data,
  preCompileData = {},
}: Args): Promise<void> => {
  payload.logger.info(`Sending an email: ${subject}`);
  const templateData = {
    ...data,
    apiURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  };

  if (Object.keys(preCompileData).length > 0) {
    Object.entries(preCompileData).forEach(([key, val]) => {
      if (typeof val === "string") {
        templateData[key] = Handlebars.compile(val)(templateData);
      }
    });
  }

  const preInlinedCSS = getHTML(templateData);

  const html = await inlineCSS(preInlinedCSS, {
    url: " ",
    removeStyleTags: false,
  });

  await payload.sendEmail({
    from,
    to,
    subject,
    html,
  });
};
