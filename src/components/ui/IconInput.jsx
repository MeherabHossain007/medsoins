import React from "react";

function IconInput({svg, placeholder}) {
  return (
      <div className="p-3 border border-gray-200 rounded-full">
        <label className="input">
          {svg}
          <input type="text" class="grow" placeholder={placeholder} />
        </label>
    </div>
  );
}

export default IconInput;
