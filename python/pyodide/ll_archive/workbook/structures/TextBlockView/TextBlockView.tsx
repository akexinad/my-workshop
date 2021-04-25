import {
  ContentState,
  convertFromRaw,
  ContentBlock,
  Editor,
  EditorState
} from "draft-js";
import React from "react";
import { TB } from "../../types";
import classes from "./TextBlockView.module.scss";

interface TextBlockProps {
  defaultText: string;
  state: {blocks: Array<ContentBlock>; entityMap: any};
}

class TextBlockView extends React.Component<
  TextBlockProps,
  { editorState: EditorState }
> {
  constructor(props: TextBlockProps) {
    super(props);

    let state = EditorState.createWithContent(
      ContentState.createFromText("TEXT")
    );

    try {
      state = EditorState.createWithContent(
        convertFromRaw(props.state)
      );
    } catch (e) {
      console.error(e)
    }

    this.state = { editorState: state };
  }

  render() {
    return (
      <div className={classes.textblock}>
        <Editor editorState={this.state.editorState} readOnly />
      </div>
    );
  }
}

export default TextBlockView;
