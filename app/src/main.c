#include <pebble.h>
#include "main.h"

static Window *window;
static Layer *s_simple_bg_layer;

static TextLayer  *month_layer, *date_layer, *label_layer;

static char month[] = "00";
static char date[] = "00";
static GFont s_date_font;
static GFont s_month_font;
static GFont s_label_font;

static BitmapLayer *clock_layer;
static GBitmap *clock_bitmap;

static GPath *s_minute_arrow, *s_hour_arrow, *s_second_arrow, *s_second_arrow2;

static void hands_update_proc(Layer *layer, GContext *ctx) {

  time_t now = time(NULL);
  struct tm *t = localtime(&now);



}

static void handle_second_tick(struct tm *tick_time, TimeUnits units_changed) {
  layer_mark_dirty(window_get_root_layer(window));
}

static void window_load(Window *window) {
  Layer *window_layer = window_get_root_layer(window);
  GRect bounds = layer_get_bounds(window_layer);

  //ACTION: Create GBitmap, then set to created BitmapLayer
  clock_bitmap = gbitmap_create_with_resource(RESOURCE_ID_bg_image);
  clock_layer = bitmap_layer_create(GRect(0, 0, 180, 180));
  bitmap_layer_set_bitmap(clock_layer, clock_bitmap);
  layer_add_child(window_get_root_layer(window), bitmap_layer_get_layer(clock_layer));


}

static void window_unload(Window *window) {
  layer_destroy(s_simple_bg_layer);
  gbitmap_destroy(clock_bitmap);
  bitmap_layer_destroy(clock_layer);
  fonts_unload_custom_font(s_date_font);
  fonts_unload_custom_font(s_month_font);
  text_layer_destroy(date_layer);
  text_layer_destroy(month_layer);
}

static void init() {
  window = window_create();
  window_set_window_handlers(window, (WindowHandlers) {
    .load = window_load,
    .unload = window_unload,
  });
  window_stack_push(window, true);


  
  Layer *window_layer = window_get_root_layer(window);
  GRect bounds = layer_get_bounds(window_layer);

  tick_timer_service_subscribe(SECOND_UNIT, handle_second_tick);
}

static void deinit() {
  tick_timer_service_unsubscribe();
  window_destroy(window);
}

int main() {
  init();
  app_event_loop();
  deinit();
}