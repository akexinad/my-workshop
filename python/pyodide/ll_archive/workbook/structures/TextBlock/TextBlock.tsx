import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  DraftEditorCommand,
  Editor,
  EditorState,
  RichUtils
} from "draft-js";
import React from "react";
import { TB } from "../../types";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import classes from "./TextBlock.module.scss";

interface TextBlockProps {
  defaultText: string;
  name: string;
  save: (b: TB) => void;
  delete: () => void;
}

class TextBlock extends React.Component<
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
        convertFromRaw(JSON.parse(props.defaultText))
      );
    } catch (e) {
      console.error(props.defaultText, e);
    }

    this.state = { editorState: state };
  }

  onChange(editorState: EditorState) {
    this.setState({ editorState });
  }

  handleKeyCommand(command: DraftEditorCommand, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange.bind(this)(newState);
      return "handled";
    }
    return "not-handled";
  }

  render() {
    return (
      <div className={classes.textblock}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange.bind(this)}
          handleKeyCommand={this.handleKeyCommand.bind(this)}
          onBlur={(e) =>
            this.props.save({
              type: "TEXT",
              description: this.props.name,
              name: this.props.name,
              text: JSON.stringify(
                convertToRaw(this.state.editorState.getCurrentContent())
              ),
              order: 0
            })
          }
        />
        <DeleteButton delete={this.props.delete} />
      </div>
    );
  }
}

export default TextBlock;
