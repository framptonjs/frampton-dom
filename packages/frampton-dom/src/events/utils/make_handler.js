export default function make_handler(messages, decorator) {
  return function(evt) {
    messages(decorator(evt));
  };
}
