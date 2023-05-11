import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "react-bootstrap/Button";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <Button variant="info">{copied ? "Copied!" : "Copy Link"}</Button>
    </CopyToClipboard>
  );
}

export default CopyButton;
