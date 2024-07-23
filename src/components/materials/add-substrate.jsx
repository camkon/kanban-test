import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import add_icon from "../../assets/icons/add.svg";
import close_icon from "../../assets/icons/close.svg";

const AddSubstrate = ({ setData, open, setOpen }) => {
  const [signal, setSignal] = useState("");

  const form = useFormik({
    initialValues: {
      id: uuidv4(),
      name: "",
      items: [],
    },
    onSubmit: (values) => {
      setData((prev) => [...prev, values]);
      setOpen(false);
      form.resetForm();
    },
  });

  const handleSetSignalList = (e) => {
    form.setFieldValue("items", [
      ...form.values.items,
      { id: uuidv4(), name: signal },
    ]);
    setSignal("");
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      noValidate
      className={`${
        open ? "" : "hidden"
      } fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50`}
    >
      <div className="bg-white rounded-xl w-10/12 lg:w-1/2 px-5 py-4">
        <div className="flex justify-between mb-4 items-center">
          <h6>Add Carrier</h6>
          <button className="icon-btn-contained-small rounded-lg">
            <img className="h-4 w-11" src={close_icon} alt="right icon" />
          </button>
        </div>

        <div>
          <p className="text-sm mb-1">Carrier Name</p>
          <input
            value={form.values.name}
            name="name"
            onChange={form.handleChange}
            type="text"
            placeholder="ex : Carrier 1"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mt-3">
          <p className="text-sm mb-1">Signals</p>
          <div className="flex flex-row items-center justify-between gap-x-2">
            <input
              type="text"
              value={signal}
              onChange={(e) => setSignal(e.target.value)}
              placeholder="Signal Name"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSetSignalList}
              className="icon-btn-contained-small rounded-lg"
            >
              <img className="h-4 w-11" src={add_icon} alt="right icon" />
            </button>
          </div>

          <div>
            {form.values.items?.length > 0 &&
              form.values.items?.map((item) => (
                <div className="flex flex-row justify-between rounded-md items-center gap-x-2 mt-2 bg-slate-200">
                  <p className="text-sm pl-3">{item?.name}</p>
                  <button
                    onClick={() =>
                      form.setFieldValue(
                        "items",
                        form.values.items.filter((i) => i.id !== item.id)
                      )
                    }
                    className="bg-slate-200 rounded-lg px-3 text-2xl flex justify-center items-center font-thin"
                  >
                    -
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="flex justify-end gap-x-2 mt-4">
          <button
            onClick={() => setOpen(false)}
            className="btn-contained bg-red-700 hover:bg-red-800"
          >
            Cancel
          </button>
          <button
            disabled={
              form.values.name === "" || form.values.items?.length === 0
            }
            onClick={form.handleSubmit}
            className={`btn-contained ${
              form.values.items?.length === 0
                ? "bg-zinc-400 hover:bg-zinc-400"
                : ""
            }`}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddSubstrate;
