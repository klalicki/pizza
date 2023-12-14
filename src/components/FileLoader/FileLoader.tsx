import { Dropzone, DropzoneProps, FileWithPath } from "@mantine/dropzone";
import { Group, Text, rem } from "@mantine/core";
import { ScalerContext, ScalerContextType } from "../../context/ScalerContext";
import { useContext } from "react";

export const FileLoader = () => {
  const { schemaErrorText, validateAndLoad } = useContext(
    ScalerContext
  ) as ScalerContextType;
  return (
    <section>
      <h3>Load a Recipe</h3>
      <Dropzone
        accept={{ "application/json": [".json"] }}
        onDrop={function (files: FileWithPath[]): void {
          // use FileReader API
          const fileReader = new FileReader();
          // add an event listener to process the file when it is loaded
          fileReader.addEventListener("load", () => {
            const newData = JSON.parse(fileReader.result as string);
            validateAndLoad(newData);
            console.log(newData);
          });
          // get the first returned file, and read it as text
          fileReader.readAsText(files[0]);

          console.log(files);
        }}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <p>ACCEPT</p>
          </Dropzone.Accept>
          <Dropzone.Reject>
            <p>You must upload a .json file.</p>
          </Dropzone.Reject>

          <div>
            <Text size="xl" inline>
              Drag a recipe file here, or click to select a file.
            </Text>
          </div>
        </Group>
      </Dropzone>
      {schemaErrorText && <p>{schemaErrorText}</p>}
    </section>
  );
};