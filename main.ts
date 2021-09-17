input.onButtonPressed(Button.A, function () {
    change_by = 1
    if (set_time_mode) {
        set_time_array = [kitronik_halo_hd.readTimeParameter(TimeParameter.Hours), kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes), kitronik_halo_hd.readTimeParameter(TimeParameter.Seconds)]
        set_time_array[1] = set_time_array[1] + change_by
        if (set_time_array[1] > 59) {
            set_time_array[1] = 0
            set_time_array[0] = set_time_array[0] + 1
        }
        if (set_time_array[0] > 12) {
            set_time_array[0] = 0
        }
        kitronik_halo_hd.setTime(set_time_array[0], set_time_array[1], 0)
    }
})
function fill_segment (center: number, width: number, fill_color: number, fade: boolean) {
    fill_start = center - Math.idiv(width, 2)
    for (let index = 0; index <= width - 1; index++) {
        haloDisplay.setZipLedColor(fill_start, fill_color)
        fill_start = fill_start + 1
        if (fill_start == 60) {
            fill_start = 0
        }
    }
}
function startup () {
    hand_colors = [kitronik_halo_hd.colors(ZipLedColors.Yellow), kitronik_halo_hd.colors(ZipLedColors.Blue), kitronik_halo_hd.colors(ZipLedColors.Red)]
    haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
    haloDisplay.setBrightness(35)
    time_array = [kitronik_halo_hd.readTimeParameter(TimeParameter.Hours), kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes), kitronik_halo_hd.readTimeParameter(TimeParameter.Seconds)]
    last_second = -1
    set_time_mode = false
    set_animation = images.createBigImage(`
        . . # . . . . # . .
        . # # . . . . # # .
        # # # . . . . # # #
        . # # . . . . # # .
        . . # . . . . # . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # . . . .
        `)
    basic.pause(30)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . # . . .
        `)
    basic.pause(30)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    haloDisplay.clear()
}
input.onButtonPressed(Button.AB, function () {
    set_time_mode = !(set_time_mode)
    haloDisplay.clear()
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
input.onButtonPressed(Button.B, function () {
    change_by = 10
    if (set_time_mode) {
        set_time_array = [kitronik_halo_hd.readTimeParameter(TimeParameter.Hours), kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes), kitronik_halo_hd.readTimeParameter(TimeParameter.Seconds)]
        set_time_array[1] = set_time_array[1] + change_by
        if (set_time_array[1] > 59) {
            set_time_array[1] = 0
            set_time_array[0] = set_time_array[0] + 1
        }
        if (set_time_array[0] > 12) {
            set_time_array[0] = 0
        }
        kitronik_halo_hd.setTime(set_time_array[0], set_time_array[1], 0)
    }
})
function fill_leds (leds: number, color_idx: number) {
    fill_color = hand_colors[color_idx]
    for (let index = 0; index <= leds; index++) {
        haloDisplay.setZipLedColor(index, fill_color)
    }
    for (let index = 0; index <= 60 - leds; index++) {
        haloDisplay.setZipLedColor(index + leds, kitronik_halo_hd.colors(ZipLedColors.Black))
    }
}
function set_time_indicator () {
    set_animation.scrollImage(5, 500)
}
let fill_color = 0
let set_animation: Image = null
let last_second = 0
let time_array: number[] = []
let hand_colors: number[] = []
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
let fill_start = 0
let set_time_array: number[] = []
let set_time_mode = false
let change_by = 0
startup()
basic.forever(function () {
    time_array = [kitronik_halo_hd.readTimeForZip(TimeParameter.Hours), kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes), kitronik_halo_hd.readTimeParameter(TimeParameter.Seconds)]
    if (set_time_mode) {
        set_time_indicator()
        fill_leds(time_array[1], 1)
        fill_segment(time_array[0], 5, hand_colors[0], true)
        haloDisplay.show()
    } else {
        if (last_second != time_array[2]) {
            fill_leds(time_array[1], 1)
            fill_segment(time_array[0], 5, hand_colors[0], true)
            fill_segment(time_array[2], 3, hand_colors[2], true)
            haloDisplay.show()
        }
        last_second = time_array[2]
    }
})
